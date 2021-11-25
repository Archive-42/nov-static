import React, { Component } from "react";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import Banner from "../components/Banner.js";
class About extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner title="Contact" subtitle="Please contact me at test@test.in" />
        <div className="container">
          <h2>Contact</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            placerat orci eu nulla sagittis, pulvinar dignissim lectus
            consequat. Etiam in lobortis ligula, vitae ornare lacus. Vivamus
            scelerisque lorem arcu, vitae eleifend ex commodo a. Quisque rutrum,
            augue sit amet egestas efficitur, magna nulla lacinia elit, sed
            suscipit tortor erat vitae enim. Donec egestas odio id aliquet
            rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae; Quisque mi dolor, egestas nec
            lacinia non, sodales eu lacus. Donec ultricies nec elit ac ornare.
            Quisque fermentum ligula ut feugiat cursus. Aliquam auctor suscipit
            ex a lacinia. Mauris sollicitudin, justo quis fringilla finibus, dui
            diam ullamcorper nulla, sit amet placerat justo neque quis quam.
            Praesent nec nibh at tortor ornare dignissim. Morbi tincidunt
            fringilla turpis at luctus. Vivamus dapibus ligula eget pellentesque
            luctus. Maecenas ut consectetur lacus, non dignissim nisi. Praesent
            sodales tellus sit amet faucibus tempus.
          </p>

          <h2 className="text-center mb-4 textcolor">Get In Touch</h2>
          <p className="lead text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus,
            et.
          </p>

          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Phone</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  name="phone"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  name="email"
                  placeholder="E-mail"
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Message</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="text"
                  placeholder="How can we help you?"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>

          {/* changes */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
