# Requirements

[Node.js](https://nodejs.org/en/download) is required for this.

# Getting started

1. `npx create-react-app my-app`
2. `cd my-app`
3. `npm install axios`
4. `npm install react-router-dom`

# Possible Errors

Backend needs `flask_cors` in order to serve data to another site.
Since this React app has a different protocol / hostname / port combination than the backend,
an error will be thrown by the browser unless the backend has a certain header in its responses.

`$ pip install -U flask-cors`

```
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"
```

# Creating the Router

Rather than creating different files for different pages, React is used for single-page
web apps. They have the functionality of multiple pages, but routing is done in the browser
rather than on the server.

# Creating the Navbar

React's component structure allows modularity - rather than having to write out a navbar in
multiple pages, we can write one and import it where needed.

# Creating the list of Games

Use axios to send a GET request. Render the response in the browser.

# Creating the Add Game button

Use axios to send a POST request.
