import styled from 'styled-components';

export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: ${p => p.theme.space[7]}px;
  color: ${p => p.theme.colors.white};
  padding-top: ${p => p.theme.space[2]}px;
  padding-bottom: ${p => p.theme.space[2]}px;
  background-color: ${p => p.theme.colors.primary};
  border: none;
  border-radius: ${p => p.theme.radii.normal};
  transition: background-color 250ms ease-in-out, box-shadow 250ms ease-in-out;

  :hover {
    background-color: ${p => p.theme.colors.accent};
    box-shadow: ${p => p.theme.shadows.btn};
    cursor: pointer;
  }
`;
