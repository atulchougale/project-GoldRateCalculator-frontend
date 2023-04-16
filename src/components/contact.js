import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram ,faMailchimp } from '@fortawesome/free-brands-svg-icons';


const Banner = () => (
  <div className="bg-[length:1500px_400px]  bg-center h-96 "
    style={{ backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/854/202/576/gold-diamond-coins-hd-wallpaper-preview.jpg)" }}
  />
);

const Wrapper = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Text = ({ children }) => (
  <p className="text-gray-500">{children}</p>
);

const Contact = () => {
  return (
    <div>
      <Banner />
      <Wrapper>
        <h1 className="text-4xl font-bold mb-8">Getting in touch is easy!</h1>
        <Text className="text-2xl">
          Reach out to me on : &nbsp;
          <a
            href="https://www.instagram.com/atulchougale07/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            <FontAwesomeIcon icon={faInstagram} className="inline-block align-text-bottom" />
          </a>
          &nbsp; or &nbsp; send me an Email :&nbsp;
          <a
            href="mailto:atul7chougale@gmail.com?Subject=This is a subject"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            <FontAwesomeIcon icon={faMailchimp} className="inline-block align-text-bottom" />
          </a>
          .
        </Text>
      </Wrapper>
    </div>
  );
};

export default Contact;
