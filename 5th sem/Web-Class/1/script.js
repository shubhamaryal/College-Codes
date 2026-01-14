const text = document.getElementById('para')
console.log(text)

text.textContent = "the text is changed"

const newText = document.createElement('h1')
newText.textContent = "New heading"
text.appendChild(newText)

