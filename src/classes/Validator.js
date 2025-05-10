class Validator {
  constructor(fields, formID) {
    this.fields = fields;
    this.formID = formID;
    this.errors = {};

    this.generateErrorObjects();
  }

  generateErrorObjects() {
    for (let field in this.fields) {
      this.errors[field] = [];
    }
  }

  validate() {
    let rules = this.fields;
    let inputFields = document.querySelectorAll(`${this.formID} input`);

    inputFields.forEach((input) => {
      let fieldName = input.getAttribute("name");
      let fieldValue = input.value;

      this.errors[fieldName] = [];

      if (!rules[fieldName]) {
        return;
      }

      if (rules[fieldName].required) {
        if (fieldValue === "") {
          this.errors[fieldName].push("This field is required!");
          return;
        }
      }
      if (rules[fieldName].email) {
        if (!this.validateEmail(fieldValue)) {
          this.errors[fieldName].push("Incorrect email adress!");
        }
      }

      if (
        fieldValue.length < rules[fieldName].minlength ||
        fieldValue.length > rules[fieldName].maxlength
      ) {
        this.errors[fieldName].push(
          `This field can't have less than ${rules[fieldName].minlength} or more then ${rules[fieldName].maxlength} characters!`
        );
      }

      if (rules[fieldName].matching) {
        let matchingEl = document.querySelector(
          `${this.formID} input[name="${rules[fieldName].matching}"]`
        );

        if (fieldValue !== matchingEl.value) {
          this.errors[fieldName].push("The passwords doesnt match!");
        }

        if (this.errors[fieldName].length === 0) {
          this.errors[fieldName] = [];
          this.errors[rules[fieldName].matching] = [];
        }
      }
    });

    this.populateErrors(this.errors);
  }

  validationPassed() {
    for (let key of Object.keys(this.errors)) {
      if (this.errors[key].length > 0) {
        return false;
      }
    }

    return true;
  }

  populateErrors(errors) {
    for (const elem of document.querySelectorAll("ul")) {
      elem.remove();
    }

    for (let key of Object.keys(errors)) {
      let parentElement = document.querySelector(
        `${this.formID} input[name="${key}"]`
      ).parentElement;
      let errorsElement = document.createElement("ul");
      parentElement.appendChild(errorsElement);

      errors[key].forEach((error) => {
        let li = document.createElement("li");
        li.classList.add("text-xs", "text-red-400", "mt-2");
        li.innerText = error;

        errorsElement.appendChild(li);
      });
    }
  }

  validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}

export default Validator;
