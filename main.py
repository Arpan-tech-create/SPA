from flask import Flask, jsonify, request, render_template
import sqlite3

app = Flask(__name__,template_folder='templates')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/data", methods=["GET"])
def get_data():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("SELECT * FROM data")
    data = c.fetchall()
    conn.close()
    return jsonify(data)

@app.route("/api/data", methods=["POST"])
def post_data():
    data = request.get_json()
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("INSERT INTO data (name, email, phone) VALUES (?, ?, ?)", (data["name"], data["email"], data["phone"]))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route("/api/data/<int:id>", methods=["PUT"])
def put_data(id):
    data = request.get_json()
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("UPDATE data SET name=?, email=?, phone=? WHERE id=?", (data["name"], data["email"], data["phone"], id))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route("/api/data/<int:id>", methods=["DELETE"])
def delete_data(id):
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("DELETE FROM data WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
