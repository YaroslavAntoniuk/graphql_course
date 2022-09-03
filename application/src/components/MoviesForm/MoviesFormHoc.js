import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { moviesQuery } from '../MoviesTable/queries';
import { addMovieMutation } from './mutations';
import { directorsQuery } from './queries';
import { directorsQuery as allDirectors } from '../DirectorsTable/queries';

import { styles } from './styles';

const withGraphQlAdd = graphql(addMovieMutation, {
  props: ({ mutate }) => ({
    addMovie: (movie) =>
      mutate({
        variables: movie,
        refetchQueries: [{ query: moviesQuery }, { query: allDirectors}],
      }),
  }),
});

export default compose(
  withStyles(styles),
  withGraphQlAdd,
  graphql(directorsQuery),
);
