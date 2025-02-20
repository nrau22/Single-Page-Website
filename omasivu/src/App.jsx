import React, { useState } from 'react';

const Header = () => (
  <header className="header">
    <h1>The World’s Most Useless Inventions</h1>
  </header>
);

const Nav = () => (
  <nav className="nav">
    <a href="#intro">Introduction</a>
    <a href="#gallery">Gallery</a>
    <a href="#contact">Contact</a>
  </nav>
);

const Intro = () => {
  const [joke, setJoke] = useState('');

  const generateJoke = () => {
    const jokes = [
      "Why don't skeletons fight each other? They don't have the guts!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I told my wife she should embrace her mistakes. She gave me a hug!",
      "Why did the bicycle fall over? It was two-tired!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(randomJoke);
  };

  return (
    <section id="intro" className="intro">
      <h2>Welcome!</h2>
      <p>
        Explore the bizarre world of completely unnecessary inventions. Laugh, cringe,
        and wonder "Why does this exist?"
      </p>
      <button onClick={generateJoke}>Click for a Joke</button>
      {joke && <p style={{ marginTop: '20px', fontStyle: 'italic' }}>{joke}</p>}
    </section>
  );
};

const Gallery = () => (
  <section id="gallery" className="gallery">
    <h2>Gallery of Uselessness</h2>
    <div>
      <img
        src="https://via.placeholder.com/400x300?text=Invisible+Umbrella"
        alt="Invisible Umbrella"
        className="responsive-img"
      />
      <p>Invisible Umbrella: Keep dry without being dry!</p>
    </div>
    <div>
      <img
        src="https://via.placeholder.com/400x300?text=Spaghetti+Fork"
        alt="Spaghetti Fork"
        className="responsive-img"
      />
      <p>Spaghetti Fork: Because twirling is too mainstream.</p>
    </div>
  </section>
);

const Contact = () => {
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormMessage("Thank you for your submission!");
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <p>Have a useless invention idea? Share it with us!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" id="name" name="name" required />
        </div>
        <br />
        <div>
          <label htmlFor="idea">Your Invention Idea:</label>
          <br />
          <textarea id="idea" name="idea" rows="4" required></textarea>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {formMessage && (
        <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'white' }}>{formMessage}</p>
      )}
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 The World’s Most Useless Inventions. All Rights Reserved.</p>
  </footer>
);

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Intro />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
