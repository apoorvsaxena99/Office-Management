class Registeration {
    constructor(name, email, birthday, designation, interest) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.designation = designation;
        this.interest = interest;
    }
}
class Contact {
    static displaycontact() {
        const allcontact = LocalStore.getContact();
        allcontact.forEach((contact) => Contact.addContactToList(contact));
    }
    static addContactToList(contact) {
        const list = document.querySelector("#contact-list");
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.birthday}</td>
                        <td>${contact.designation}</td>
                        <td>${contact.interest}</td>
                        <td><a href='#' class="btn btn-danger btn-sm delete">Delete</a></td>`;
        list.appendChild(row);
    }
    static clearFields() {
        document.querySelector("#name").value = '';
        document.querySelector("#email").value = '';
        document.querySelector("#birthday").value = '';
        document.querySelector("#designation").value = '';
        document.querySelector("#interest").value = '';
    }
    static removeparticular(tag) {
        if (tag.classList.contains('delete')) {
            if (confirm('Are You Sure,You Want To Delete It')); {
                tag.parentElement.parentElement.remove();
            }
        }
    }
    static showAlert(message, ClassName) {
        const div = document.createElement('div');
        div.className = `alert alert-${ClassName}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#contact-form');
        container.insertBefore(div, form);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }
}
class LocalStore {
    static getContact() {
        let contact;
        if (localStorage.getItem('contact') == null) {
            contact = [];
        } else {
            contact = JSON.parse(localStorage.getItem('contact'));
        }
        return contact;
    }
    static addContact(contact) {
        const contacts = LocalStore.getContact();
        contacts.push(contact);
        localStorage.setItem('contact', JSON.stringify(contacts));
    }
    static removeContact(email) {
        const contacts = LocalStore.getContact();
        contacts.forEach((contact, index) => {
            if (contact.email === email)
                contacts.splice(index, 1);
        })
        localStorage.setItem('contact', JSON.stringify(contacts));
    }
}
document.addEventListener('DOMContentLoaded', Contact.displaycontact);
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const birthday = document.querySelector('#birthday').value;
    const designation = document.querySelector('#designation').value;
    const interest = document.querySelector('#interest').value;
    if (name === '' || email === '' || birthday === '' || designation === '' || interest === '') {
        Contact.showAlert('Please Fill All The Fields', 'danger');
    } else {
        const contact = new Registeration(name, email, birthday, designation, interest);
        Contact.addContactToList(contact);
        LocalStore.addContact(contact);
        Contact.clearFields();
        Contact.showAlert('Contact Added Successfully', 'success');
    }
});
document.querySelector('#contact-list').addEventListener('click', (e) => {
    Contact.removeparticular(e.target);
    LocalStore.removeContact(e.target.parentElement.previousSibling.textContent);
    Contact.showAlert('Contact Deleted Successfully..!!', 'success');
})