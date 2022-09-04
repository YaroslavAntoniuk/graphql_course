import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { directorsQuery } from '../DirectorsTable/queries';
import { addDirectorMutation, updateDirectorMutation } from './mutations';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
      addDirector: (director) =>
        mutate({
          variables: director,
          refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
        }),
    }),
  }),
  graphql(updateDirectorMutation, {
    props: ({ mutate }) => ({
      updateDirector: (director) =>
        mutate({
          variables: director,
          refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
        }),
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
