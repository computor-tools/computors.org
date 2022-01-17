import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    max-width: 60vw;
    line-height: 160%;
    text-align: center;
    font-family: Inconsolata, 'monospace';
    font-size: 35px;
    margin: 0;

    @media (max-width: 768px) {
      text-align: left;
      padding: 0 14px;
      font-size: 24px;
      max-width: 100vw;
    }
  }
`;

const IntroNav = styled.div`
  margin-top: 20px;
  display: flex;
  max-width: 90vw;

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 16px;
    max-width: 100vw;
    width: 100vw;
    flex-direction: column;
  }

  section {
    flex: 1;
    margin: 0 10px;
    padding: 20px;
    //border: 4px solid #222;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 768px) {
      margin: 0;
      padding: 0;
    }
  }

  h2 {
    font-weight: normal;
    font-size: 35px;
    text-align: center;
    font-family: Inconsolata, 'monospace';
  }

  p {
    text-align: left;
    font-size: 20px;
    font-family: sans-serif;

    @media (max-width: 768px) {
      font-size: 16px;
      flex-direction: column;
    }
  }
`;

const IntroLink = styled(Link)`
  margin: 20px 0;
  padding: 10px 30px;
  background: #222;
  border-radius: 5px;
  background: ${function (props) {
    return props.background || '#00ffe9';
  }};
  color: #121212;
  box-shadow: 0 4px 10px rgba(0, 0, 0.5);
  transition: transform 0.3s;
  font-size: 25px;
  font-family: sans-serif;
  text-align: center;
  display: block;
  font-weight: bold;

  @media (max-width: 768px) {
    margin: 20px 14px;
    width: calc(100% - 88px);
  }

  &:hover {
    text-decoration: none;
  }

  ${function (props) {
    if (props.disabled) {
      return {
        cursor: 'default',
        opacity: 0.5,
      };
    }
  }}
`;

const Home = function () {
  return (
    <Intro>
      <em style={{ color: 'yellow' }}>(!) This website is under construction</em>
      <br />
      <br />
      <p>
        A knowledge base about Qubic,
        <br />a quorum-based computations protocol.
      </p>
      <IntroNav>
        <section>
          <div>
            <h2>Mine ⛏️</h2>
            <p>
              Qubic miners compete on training an artificial neural network. By eliminating
              remaining errors, a proof-of-<em>useful</em>-work, miners increase their energy.
            </p>
          </div>
          <IntroLink to="/mining">Start mining</IntroLink>
        </section>
        <section>
          <div>
            <h2>Compute 🧮</h2>
            <p>
              Computors in Qubic are companies or persons running Qubic software doing computations
              according to the Qubic protocol.
            </p>
          </div>
          <IntroLink to="" disabled background="rgb(255, 105, 255)" alt="Comming soon">
            Start computing
          </IntroLink>
        </section>
        <section>
          <div>
            <h2>Build 🛠</h2>
            <p>Build JavaScript programs interacting with Qubic protocol.</p>
          </div>
          <IntroLink to="/building/javascript">Start building</IntroLink>
        </section>
      </IntroNav>
    </Intro>
  );
};

export default Home;
