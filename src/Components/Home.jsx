import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 58px - 69px);

  @media (max-width: 768px) {
    min-height: auto;
    margin-bottom: 14px;
  }

  p {
    max-width: max(1000px, 85vw);
    line-height: 160%;
    text-align: center;
    font-family: Inconsolata, 'monospace';
    font-size: 40px;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      text-align: left;
      padding: 0 14px;
      font-size: 24px;
      max-width: 100vw;
    }
  }
`;

const IntroNav = styled.div`
  margin: 60px 0;
  display: flex;
  max-width: max(1000px, 85vw);

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 16px;
    max-width: 100vw;
    width: 100vw;
    flex-direction: column;
  }

  section {
    flex: 1;
    margin: 0 25px;
    padding: 40px 20px 20px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.02);
    }

    &:nth-child(2n) {
      transform: scale(1.1);

      &:hover {
        transform: scale(1.12);
      }
    }

    @media (max-width: 768px) {
      &:nth-child(2n) {
        transform: scale(1);
        &:hover {
          transform: scale(1);
        }
      }

      &:hover {
        transform: scale(1);
      }
      margin: 8px 14px;
      padding: 14px 0;
    }
  }

  h2 {
    font-weight: normal;
    font-size: 30px;
    margin-top: 0;
    text-align: center;
    font-family: Inconsolata, 'monospace';

    @media (max-width: 768px) {
      font-size: 25px;
      text-align: left;
      padding: 0 14px;
    }
  }

  p {
    text-align: left;
    font-size: 18px;
    font-family: sans-serif;

    @media (max-width: 768px) {
      font-size: 16px;
      flex-direction: column;
    }
  }
`;

const IntroLink = styled(Link)`
  margin: 20px 0 0 0;
  padding: 10px 30px;
  background: #222;
  border-radius: 5px;
  background: ${function (props) {
    return props.background || '#00ffe9';
  }};
  color: #121212;
  box-shadow: 0 4px 10px rgba(0, 0, 0.5);
  font-size: 20px;
  font-family: sans-serif;
  text-align: center;
  display: block;
  font-weight: bold;

  @media (max-width: 768px) {
    margin: 20px 14px 0 14px;
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
      <p>
        A knowledge base about Qubic,
        <br />a quorum-based computations protocol.
      </p>
      <IntroNav>
        <section style={{ background: 'linear-gradient(#2a4140, #1c2b2a)' }}>
          <div>
            <h2>Mine ⛏️</h2>
            <p>
              Qubic miners compete on training an artificial neural network. By eliminating
              remaining errors, a proof-of-<em>useful</em>-work, miners increase their energy.
            </p>
          </div>
          <IntroLink to="/mining">Start mining</IntroLink>
        </section>
        <section style={{ background: 'linear-gradient(#422f4a, #271c2b)' }}>
          <div>
            <h2>Compute 🧮</h2>
            <p>
              Computors in Qubic are companies or persons running Qubic software doing computations
              according to the Qubic protocol.
            </p>
          </div>
          <IntroLink to="/computing/testing" background="rgb(255, 105, 255)" alt="Comming soon">
            Start testing
          </IntroLink>
        </section>
        <section style={{ background: 'linear-gradient(rgb(19, 55, 81), rgb(10, 29, 43)' }}>
          <div>
            <h2>Build 🛠</h2>
            <p>Build JavaScript programs interacting with Qubic protocol.</p>
          </div>
          <IntroLink to="/building/javascript" background="rgb(0, 145, 255)">
            Start building
          </IntroLink>
        </section>
      </IntroNav>
    </Intro>
  );
};

export default Home;
