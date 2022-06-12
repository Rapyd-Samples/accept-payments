import {Link, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('operation_id')
    return (
        <ErrorBox>
            Error Generating Checkout Page
            <br/>
            {operationId && `Please contact customer support and provide the following operation id ${operationId}`}
            {<>
                <br/>
                <Link to="/">Return to Home</Link>
            </>}
        </ErrorBox>
    );
}

export default Error;


const ErrorBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 18px 30px;
  white-space: pre-line;
  overflow-wrap: break-word;
  border: solid 1px #e6a9a1;
  background-color: #f8ecea;
`;