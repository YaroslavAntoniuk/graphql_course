import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { directorsQuery } from '../DirectorsTable/queries';
import { addDirectorMutation } from './mutations';

import { styles } from './styles';

const withGraphQlAdd = graphql(addDirectorMutation, {
  props: ({ mutate }) => ({
    addDirector: (director) =>
      mutate({
        variables: director,
        refetchQueries: [{ query: directorsQuery }],
      }),
  }),
});

export default compose(withStyles(styles), withGraphQlAdd);
