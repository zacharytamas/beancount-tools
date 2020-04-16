import nearley from 'nearley';

import grammar from './parser';

const BeancountParser = () => new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

export default BeancountParser;
