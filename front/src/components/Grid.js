import styled from "styled-components";

const Grid = styled.div`
  width: 100%;
  display: grid;

  grid-auto-flow: dense;

  grid-template-columns: repeat(8, 120px);
  grid-column-gap: 25px;

  justify-content: center;
  justify-items: center;
  @media (min-width: 900px) and (max-width: 1350px) {
    grid-template-columns: repeat(6, 120px);
  }

  @media (min-width: 410px) and (max-width: 900px) {
    grid-template-columns: repeat(4, 120px);
  }

  @media (max-width: 410px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
  }
`;
export default Grid;
