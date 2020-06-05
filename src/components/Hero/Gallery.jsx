import React from 'react';
import styled from 'styled-components/macro';
import useWindowWidth from '../../hooks/useWindowWidth';

import { primaryColor } from '../../constants/websiteColors';

import { Heading2 as GalleryTitle, Heading4 } from '../General/Headings';

const GalleryContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 0 calc(100vw * 245 / 1920);
  margin-bottom: 100px;
  & > * {
    text-align: center;
  }
  @media (min-width: 992px) {
    & > * {
      text-align: left;
    }
  }
`;

const GallerySubtitle = styled(Heading4)`
  margin-bottom: 64px;
`;

const GalleryWrap = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${(props) => (props.width >= 992 ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)')};
  grid-auto-rows: ${(props) =>
    props.width >= 992
      ? 'calc(20vw - 0.4 * 100vw * 245 / 1920 - 16px)'
      : 'calc(50vw - 100vw * 245 / 1920)'};
  grid-gap: 20px;
`;

const GalleryImage = styled.div`
  border-radius: 10px;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;

  grid-column: ${(props) => (props.width >= 992 ? 'auto' : 'auto !important')};
  grid-row: ${(props) => (props.width >= 992 ? 'auto' : 'auto !important')};
`;

const GalleryImageDarken = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(35, 35, 35, 0.6);
  transition-duration: 200ms;
  &:hover {
    opacity: 0;
  }
`;

// TODO Add fullscreen image view

function Gallery() {
  const width = useWindowWidth();
  const imageData = [
    {
      src:
        'https://firebasestorage.googleapis.com/v0/b/dywizjon-303.appspot.com/o/mainPhotos%2FGallery%20Photo%201.jpg?alt=media&token=c0bbdb6d-6b0d-4a6a-81d4-eef9b6cb6c1d',
      style: {
        gridColumn: '1',
        gridRow: '1',
      },
    },
    {
      src:
        'https://firebasestorage.googleapis.com/v0/b/dywizjon-303.appspot.com/o/mainPhotos%2FGallery%20Photo%202.jpg?alt=media&token=714153bd-fbd6-4cd3-a4c1-e1ec3ac15873',
      style: {
        gridColumn: '2/4',
        gridRow: '1',
      },
    },
    {
      src:
        'https://firebasestorage.googleapis.com/v0/b/dywizjon-303.appspot.com/o/mainPhotos%2FGallery%20Photo%203.jpg?alt=media&token=46de676f-c305-491c-af0c-67969d463a70',
      style: {
        gridColumn: '4/6',
        gridRow: '1/3',
      },
    },
    {
      src:
        'https://firebasestorage.googleapis.com/v0/b/dywizjon-303.appspot.com/o/mainPhotos%2FGallery%20Photo%204.jpg?alt=media&token=4f67974e-f886-41bc-85d2-849f99f8749a',
      style: {
        gridColumn: '1/3',
        gridRow: '2',
      },
    },
    {
      src:
        'https://firebasestorage.googleapis.com/v0/b/dywizjon-303.appspot.com/o/mainPhotos%2FGallery%20Photo%205.jpg?alt=media&token=0f68d489-e6b2-4646-81fd-4130a8b6a92e',
      style: {
        gridColumn: '3',
        gridRow: '2',
      },
    },
  ];
  return (
    <GalleryContainer>
      <GalleryTitle>Galeria</GalleryTitle>
      <GallerySubtitle color={primaryColor}>Miejsce, w którym można się zakochać</GallerySubtitle>
      <GalleryWrap width={width}>
        {imageData.map((image) => (
          <GalleryImage key={image.src} width={width} style={image.style} src={image.src}>
            <GalleryImageDarken />
          </GalleryImage>
        ))}
      </GalleryWrap>
    </GalleryContainer>
  );
}

export default Gallery;
