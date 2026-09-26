# Birthday site for my sister 🎂

A three-page, responsive birthday website made with plain HTML, CSS, and JavaScript. It works without a build step or paid service.

## Open in VS Code

1. Open this folder in VS Code.
2. Open `index.html` in your browser, or use the Live Server extension.
3. Visit `surprise.html` and tap the gift to hear the tune and watch the birthday reveal. Mobile browsers start sound only after a tap; this is why the gift triggers the music.

## Put it on GitHub Pages

1. Create a new GitHub repository and upload all the files in this folder to the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then save.
4. GitHub will show the public link once it finishes publishing.

## Make it personal

- Replace “sis” and “sister” in `index.html`, `letter.html`, and `surprise.html` with her name or nickname.
- Edit the birthday letter in `letter.html` to add real memories and your name.
- If you want to add photos later, put image files beside the HTML files and use an `<img>` tag in `letter.html`.
- Change the random notes in the `surprises` list near the top of `script.js`.
- The birthday melody is synthesized in `birthday.js`; it does not require an audio download.

The generated cake image is included in `cake.png`. All links between the three pages are relative, so the site works on GitHub Pages under a repository path.
