const app = new Vue({
    el: "#app",
    data: {
        rows: [],
        showModal: false,
        modalTitle: "hey",
        modalButton: "",
        formData: {
            id: null,
            name: "",
            email: "",
            phone: ""
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            fetch("/api/data")
                .then(response => response.json())
                .then(data => {
                    this.rows = data;
                })
                .catch(error => console.error(error));
        },
        addData() {
            this.modalTitle = "Add Data";
            this.modalButton = "Add";
            this.formData.id = null;
            this.formData.name = "";
            this.formData.email = "";
            this.formData.phone = "";
            this.showModal = true;
        },
        edit(row) {
            this.modalTitle = "Edit Data";
            this.modalButton = "Update";
            this.formData.id = row.id;
            this.formData.name = row.name
	    this.formData.email = row.email;
        this.formData.phone = row.phone;
        this.showModal = true;
    },
    saveData() {
        const method = this.modalButton === "Add" ? "POST" : "PUT";
        fetch(`/api/data/${this.formData.id || ""}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.formData)
        })
            .then(() => {
                this.showModal = false;
                this.getData();
            })
            .catch(error => console.error(error));
    },
    deleteData(row) {
        if (confirm("Are you sure you want to delete this data?")) {
            fetch(`/api/data/${row.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    this.getData();
                })
                .catch(error => console.error(error));
        }
    },
    closeModal() {
        this.showModal = false;
    }
}

});