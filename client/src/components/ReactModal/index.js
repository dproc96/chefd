import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    width: '60%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '25px'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#modal')

class ReactModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >


          <div className="container">
          <div className ="row">
          <div className="col-md-6 mb-4">
                <img src="https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/goulash.jpg" alt="food" />

          
              </div>
          <div className="col-md-6">
                <h2 className="mb-4" ref={subtitle => this.subtitle = subtitle} style={{ textAlign: 'center' }}>Slow cooker beef goulash</h2>
                <ul>
                  <h2>Ingredients List</h2>
                  <li className="ml-3">ginger</li>
                  <li className="ml-3">onion</li>
                </ul>
          </div>
          <div className="row">
          <h2 className="ml-4">Method</h2>
          <ol>
                  <li>Heat the slow cooker to low and heat 2 tbsp oil in a deep frying pan over a medium heat. Season and sear the beef in batches until brown on all sides. Transfer to a plate.</li>
                  <li>Put the remaining oil in the pan and fry the onions for 10 mins until lightly golden. Add the peppers and garlic, and fry for another 5-10 mins, then stir in the flour and all of the spices. Cook for 2 mins more, then stir in the tomato purée, tomatoes and 400ml beef stock. Season well. Bring the mixture to a simmer, then tip into the slow cooker with the seared beef. Add the remaining stock, if needed, to cover the meat completely. Cover and cook for 6-7 hrs until the beef is tender and the sauce has thickened slightly.</li>
                  <li>Season to taste, then swirl the soured cream and most of the parsley through the stew. Scatter over the remaining parsley and some sweet smoked paprika, then serve with small roasted potatoes or brown rice, if you like.</li>
          </ol>
          </div>
        
          </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReactModal