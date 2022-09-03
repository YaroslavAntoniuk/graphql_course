import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';
import { deleteDirectorMutation } from './mutations';

const withGraphQlDelete = graphql(deleteDirectorMutation, {
  props: ({ mutate }) => ({
    deleteDirector: (id) =>
      mutate({
        variables: id,
        refetchQueries: [{ query: moviesQuery }, { query: directorsQuery }],
      }),
  }),
});

export default compose(withGraphQlDelete);
