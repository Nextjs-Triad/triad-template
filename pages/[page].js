import PropTypes from 'prop-types';
import { fetchEntries } from 'utils';
import { toKebabCase, getComponent } from 'utils';
import { Layout } from 'components';

const Page = ({ pages, siteIdentity, page, cards }) => {
  return (
    <>
      <Layout
        title={`Triad x Next.js - ${page[0].title}`}
        {...{ pages, siteIdentity }}
      />
      {page[0].components.map(item => getComponent(item, cards))}
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetchEntries({ content_type: 'page' });
  const pages = res.map(p => p.fields);
  const paths = pages.map(page => ({
    params: { page: toKebabCase(page.title) },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const page = pages
    .map(p => p.fields)
    .filter(page => toKebabCase(page.title) === params.page);
  const cards = await fetchEntries({ content_type: 'card' });

  return {
    props: {
      pages,
      siteIdentity,
      page,
      cards,
    },
  };
};

Page.defaultProps = {
  cards: [],
};

Page.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  page: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Page;
