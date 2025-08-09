import styled from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
`;

export const SliderTrack = styled.div`
  display: flex;
  width: 100%;
  transition: transform ${({ theme }) => theme.transitions.slow};
`;

export const BannerImage = styled.img`
  width: 100%;
  min-width: 100%;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
`;
