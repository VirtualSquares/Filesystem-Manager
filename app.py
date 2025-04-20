import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_folder', methods=['POST'])
def create_folder():
    folder_name = request.form['folder_name']
    desktop_path = os.path.expanduser(r"~\OneDrive\Desktop")
    folder_path = os.path.join(desktop_path, folder_name)

    try:
        os.makedirs(folder_path)
        return jsonify({"message": f"Folder '{folder_name}' created successfully on the Desktop!"}), 200
    except Exception as e:
        return jsonify({"message": f"Error creating folder: {str(e)}"}), 500

@app.route('/create_file', methods=['POST'])
def create_file():
    file_name = request.form['file_name']
    desktop_path = os.path.expanduser(r"~\OneDrive\Desktop")
    file_path = os.path.join(desktop_path, file_name)

    try:
        with open(file_path, 'w') as f:
            f.write("")
        return jsonify({"message": f"File '{file_name}' created successfully on the Desktop!"}), 200
    except Exception as e:
        return jsonify({"message": f"Error creating file: {str(e)}"}), 500

@app.route('/delete', methods=['POST'])
def delete():
    name = request.form['name']
    desktop_path = os.path.expanduser(r"~\OneDrive\Desktop")
    target_path = os.path.join(desktop_path, name)

    try:
        if os.path.isdir(target_path):
            os.rmdir(target_path)
            return jsonify({"message": f"Folder '{name}' deleted successfully."}), 200
        elif os.path.isfile(target_path):
            os.remove(target_path)
            return jsonify({"message": f"File '{name}' deleted successfully."}), 200
        else:
            return jsonify({"message": f"No file or folder named '{name}' found."}), 404
    except Exception as e:
        return jsonify({"message": f"Error deleting: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
