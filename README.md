# Independent Cafes Gallery

An interactive web app built with **Node.js**, **Express**, and **vanilla JS** allowing users to browse cafés, view details, and submit reviews via a coffee-themed dynamic interface.

---

## Features

- **Browse Cafés**  
  View a grid of cafés with names and locations displayed in warm beige boxes.

- **Search & Filter**  
  Search cafés via a centric search bar on the homepage to quickly start typing.

- **Detailed Café View**  
  Click on any café to see more details including description, location, owner-ratings, and coffee types.

- **User Reviews & Comments**  
  Submit comments and rate cafés from 1 to 5 stars via form; comments can be viewed via the Reviews Button (top LHS).

- **Add New Café**  
  Add your own café to the gallery using a dedicated submission form, with the café being instantly added.

- **Smooth, Responsive Design**  
  Warm brown and beige color scheme with hover effects and animations for a polished UX.

---

## Technical Overview

- **Backend:**  
  - Node.js and Express serve the API endpoints and static files.  
  - `cafes.json` stores café data (name, location, description, comments, coffee types, ID).  
  - `reviews.json` stores user-submitted reviews and comments.

- **Frontend:**  
  - Vanilla JS handles fetching data via GET requests and posting new cafés or reviews with POST requests.  
  - Dynamic DOM updates allow seamless transitions between views and instant updates without page reloads.

- **File Structure:**  
  - Separate files for frontend HTML, CSS, and JS to keep code modular.  
  - JSON files used to simplify data management.

---
