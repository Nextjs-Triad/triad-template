import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';

const ContentBlock = ({ contentBlock }) => {
  const content = parse(
    documentToHtmlString(contentBlock.fields.content, richTextOptions),
  );
  return (
    <section id={contentBlock.fields.sectionLink}>
      <div className="inner">
        <h3>{contentBlock.fields.sectionTitle}</h3>
        <div>{content}</div>
      </div>
    </section>
  );
};

ContentBlock.propTypes = {
  contentBlock: PropTypes.object.isRequired,
};

export default ContentBlock;
