import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";

// [] - cuz reasons
const [deleteLastMessage] = useMutation(
  gql`
    mutation DeleteLastMessage($message_id: uuid!) {
      delete_message_history_by_pk(id: $message_id) {
        id
      }
    }
  `
);

const [addMessage] = useMutation(gql`
  mutation MyMutation($message_payload: [message_history_insert_input!]!) {
    insert_message_history(objects: $message_payload) {
      returning {
        id
      }
    }
  }
`);

const [getUserId, userPayload] = useLazyQuery(gql`
  query getUserId($name: String) {
    user(where: { name: { _eq: $name } }) {
      user_id
      name
    }
  }
`);
