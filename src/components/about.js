import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { imMail } from "react-icons/fa";


const Banner = () => (
  <div className="bg-[length:1500px_400px]  bg-center h-96"
    style={{ backgroundImage: "url(https://w0.peakpx.com/wallpaper/566/572/HD-wallpaper-gold-gold-bullion-gold-3d-gold-coins.jpg)" }}
  />
);

const Wrapper = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Text = ({ children }) => (
  <p className="text-gray-500">{children}</p>
);

const About = () => {
  return (
    <div>
      <Banner />
      <Wrapper>
        <h1 className="text-4xl font-bold mb-8">Coding Master</h1>
        <Text className='text-2xl'>
          This Website is calculate current gold rate with GST and 15% making charges .
          and also  you can calculate letest rate in diffrent corruncy. 
        </Text>

        <Text className="text-2xl">
        I'm a Software Engineer based in India. 
                    I've built websites.<br />

                    If you are interested, you can view some of my favorite projects here : &nbsp;
          <a
            href="https://github.com/atulchougale"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >


            <FontAwesomeIcon icon={faGithub} className="inline-block align-text-bottom" />
          </a>
        </Text>
        <Text className="text-2xl">
          Need something built or simply want to have chat? Reach out to me on : &nbsp;
          <a
            href="https://www.instagram.com/atulchougale07/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            <FontAwesomeIcon icon={faInstagram} className="inline-block align-text-bottom" />
          </a>
          .
        </Text>
          <Text className="text-2xl">
          &nbsp;or&nbsp; send me an Email: &nbsp;
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

export default About;
