import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { secondaryColor } from '../../constants/websiteColors';
import useWindowWidth from '../../hooks/useWindowWidth';
import galleryPhoto1 from '../../images/galleryPhoto1.webp';
import galleryPhoto2 from '../../images/galleryPhoto2.webp';
import galleryPhoto3 from '../../images/galleryPhoto3.webp';
import galleryPhoto4 from '../../images/galleryPhoto4.webp';
import galleryPhoto5 from '../../images/galleryPhoto5.webp';
import galleryPhoto6 from '../../images/galleryPhoto6.webp';
import galleryPhoto7 from '../../images/galleryPhoto7.webp';
import galleryPhoto8 from '../../images/galleryPhoto8.webp';
import { Heading2 as GalleryTitle, Heading4 } from '../general/Headings';

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
  const { t } = useTranslation();
  const width = useWindowWidth();
  const imageData = [
    {
      src: galleryPhoto1,
      style: {
        gridColumn: '1',
        gridRow: '1',
      },
    },
    {
      src: galleryPhoto2,
      style: {
        gridColumn: '2/4',
        gridRow: '1',
      },
    },
    {
      src: galleryPhoto3,
      style: {
        gridColumn: '4/6',
        gridRow: '1/3',
      },
    },
    {
      src: galleryPhoto4,
      style: {
        gridColumn: '1/3',
        gridRow: '2',
      },
    },
    {
      src: galleryPhoto5,
      style: {
        gridColumn: '3',
        gridRow: '2',
      },
    },
    {
      src: galleryPhoto6,
      style: {
        gridColumn: '1',
        gridRow: '3',
      },
    },
    {
      src: galleryPhoto7,
      style: {
        gridColumn: '2/4',
        gridRow: '3',
      },
    },
    {
      src: galleryPhoto8,
      style: {
        gridColumn: '4/6',
        gridRow: '3',
      },
    },
  ];
  return (
    <GalleryContainer>
      <GalleryTitle>{t('Gallery')}</GalleryTitle>
      <GallerySubtitle color={secondaryColor}>{t('A place to fall in love with')}</GallerySubtitle>
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
