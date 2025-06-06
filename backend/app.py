from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

books = [
    {"id": 1, "title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "available": True, "url": "Harry_potter.png"},
    {"id": 2, "title": "The Hobbit", "author": "J.R.R. Tolkien", "available": True, "url": "Harry_potter.png"},
    {"id": 3, "title": "1984", "author": "George Orwell", "available": True, "url": "Harry_potter.png"},
    {"id": 4, "title": "To Kill a Mockingbird", "author": "Harper Lee", "available": False, "url": "Harry_potter.png"},
    {"id": 5, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "available": True, "url": "Harry_potter.png"},
    {"id": 6, "title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "available": True, "url": "Harry_potter.png"},
    {"id": 7, "title": "The Hobbit", "author": "J.R.R. Tolkien", "available": True, "url": "Harry_potter.png"},
    {"id": 8, "title": "1984", "author": "George Orwell", "available": True, "url": "Harry_potter.png"},
    {"id": 9, "title": "To Kill a Mockingbird", "author": "Harper Lee", "available": False, "url": "Harry_potter.png"},
    {"id": 10, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "available": True, "url": "Harry_potter.png"}
]

UserCredent = {
    # "santhosh@gmail.com": "12345678",
    "santhosh_gravityai@gmail.com":"87654321"
    }
UserList = {}

@app.route('/', methods=['POST', 'GET'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing data"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Invalid input"}), 400

        if username.lower() in UserCredent and UserCredent[username] == password:
            UserList[username.lower()] = []  
            return jsonify({"message": "Login successful", "username": username}), 200
        else:
            return jsonify({"message": "Login incorrect"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/home', methods=['GET'])
def home():
    availableBook = [book for book in books if book['available']]
    return jsonify(availableBook)


@app.route('/book/<int:id>', methods=['GET'])
def bookDetails(id):
    clickedData = [x for x in books if id == x['id']]
    if clickedData:
        return jsonify(clickedData[0])
    else:
        return jsonify({"error": "Error fetching data in book details"})


@app.route('/search', methods=['GET'])
def Search():
    query = request.args.get("query", ' ').strip()

    filterBook = [book for book in books if query.lower() in book['title'].lower() or query.lower() in book['author'].lower()]
    if filterBook:
        return jsonify(filterBook)
    else:
        return jsonify([])


borrowedBook = []

@app.route('/Userbook/<int:id>', methods=['GET'])
def borrow(id):
    borrowedBook = [borrow for borrow in books if id == borrow['id']]
    if borrowedBook:
        return jsonify(borrowedBook[0])
    else:
        return jsonify({"error": "Book not found"})


@app.route('/MyAccount/<string:user>', methods=['GET'])
def User(user):
    user = user.lower()
    if user in UserList:
        return jsonify(UserList)
    else:
        UserList["user"]=user
        return jsonify(UserList)


@app.route('/MyAccount/<string:user>/<int:id>', methods=['POST'])
def borrowBook(user, id):
    user = user.lower()
    if user not in UserList:
        return jsonify({"error": "User not logged in"})

    book = next((book for book in books if book['id'] == id), None)
    if not book:
        return jsonify({"error": "Book not found"})

    if not book['available']:
        return jsonify({"error": "Book not available"})
    UserList[user].append(book)
    book['available'] = False 

    return jsonify({
        "message": f"Book '{book['title']}' borrowed successfully",
        "borrowed_books": UserList[user]
    })


if __name__ == '__main__':
    app.run(debug=True)
