import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';
import { deleteMovieMutation } from './mutations';

const withGraphQlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: (id) =>
      mutate({
        variables: id,
        refetchQueries: [{ query: moviesQuery }, { query: directorsQuery }],
      }),
  }),
});

export default compose(withGraphQlDelete);
