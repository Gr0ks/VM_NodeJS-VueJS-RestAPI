import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

Vue.component('loader', {
  template: `
  <div style="display: flex;justify-content: center;align-items: center">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `
});

new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: ''
      },
      contacts: []
    }
  },
  computed: {
    canCreate() {
      return (this.form.value.trim() && this.form.name.trim());
    }
  },
  methods: {
    async createContact() {
      const {...contact} = this.form;
      const newContact = await request('http://192.168.0.14:3333/api/contacts', 'POST', contact);      
      this.contacts.push(newContact);      
      this.form.name = this.form.value = '';
    },
    async markContact(id) {
      const contact = this.contacts.find(c => c.id == id);
      const updatedContact = await request(`http://192.168.0.14:3333/api/contacts/${id}`, 'PUT', {
        ...contact,
        marked: true
      });
      contact.marked = updatedContact.marked;
    },
    async removeContact(id) {
      request(`http://192.168.0.14:3333/api/contacts/${id}`, 'DELETE')
      this.contacts = this.contacts.filter(c => c.id != id);
    }
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request('http://192.168.0.14:3333/api/contacts');
    this.loading = false;
  }
});

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body = null;

    if(data) {
      headers['Content-Type'] = 'application/json',
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    });

    return response.json();
  } catch (e) {
    console.warn('Error: ', e.message);
  }
}