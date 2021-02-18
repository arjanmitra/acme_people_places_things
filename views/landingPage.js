const html = require('html-template-tag');
function landingPage(posts = [], people = [], places = [], things = []) {
  return html`
    <html>
      <head>
        <title>Acme People, Places, Things</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <h1>Acme People, Places, Things!</h1>
        <div>
          <form method="POST" action="/">
            Person<select name="person">
              <option>not selected</option>
              ${people.map(
                (person) => `<option val = ${person}>${person}</option>`
              )}
            </select>
            <br />
            Place<select name="place">
              <option>not selected</option>
              ${places.map(
                (place) => `<option val = ${place}>${place}</option>`
              )}
            </select>
            <br />
            Thing<select name="thing">
              <option>not selected</option>
              ${things.map(
                (thing) => `<option val = ${thing}>${thing}</option>`
              )}
            </select>
            Number of Things: <input name="numberOfThings" /> <br /><br />
            <input type="submit" />
          </form>
          <div>
            ${posts.map(
              (post) =>
                `<div> <form method='post' action='/${post.id}?_method=DELETE'>

                ${post.PersonId} was at ${post.PlaceId} when they purchased ${post.numberOfThings} ${post.ThingId}'s!
                <button value=${post.id}>Delete Purchase</button>
                </form></div>

                `
            )}
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = landingPage;
