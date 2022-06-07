import styled from 'styled-components';
import { Link } from "react-router-dom";

const Complete = () => {
    return (
        <CompleteBox>
            Complete Checkout URL
            {
                <>
                    <br/>
                    <Link to="/">Return to Home</Link>
                </>
            }
        </CompleteBox>
    );
}

export default Complete;


const CompleteBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 18px 30px;
  white-space: pre-line;
  overflow-wrap: break-word;
  border: solid 1px #adcad9;
  background-color: #f3faff;
`;