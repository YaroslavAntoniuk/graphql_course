import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { moviesQuery } from '../MoviesTable/queries';
import { addMovieMutation, updateMovieMutation } from './mutations';
import { directorsQuery } from './queries';
import { directorsQuery as allDirectors } from '../DirectorsTable/queries';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: (movie) =>
        mutate({
          variables: movie,
          refetchQueries: [
            { query: moviesQuery, variables: { name: '' } },
            { query: allDirectors, variables: { name: '' } },
          ],
        }),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
      updateMovie: (movie) =>
        mutate({
          variables: movie,
          refetchQueries: [
            { query: moviesQuery, variables: { name: '' } },
            { query: allDirectors, variables: { name: '' } },
          ],
        }),
    }),
  }),
  graphql(directorsQuery, {
    options: ({ name = '' }) => ({
      variables: { name },
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
