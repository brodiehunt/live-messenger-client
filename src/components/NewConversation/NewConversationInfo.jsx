import NewConversationInfoStyles from "../styles/NewConversation/NewConversationInfoStyles";
import { ButtonStyles } from "../FormButton";
import { IoClose } from "react-icons/io5";

export default function NewConversationInfo({
  recipients,
  deleteRecipient,
  isLoading,
  handleCreateConversation,
}) {
  return (
    <NewConversationInfoStyles>
      <div className="recipients-container">
        <span>Recipients:</span>
        {recipients &&
          recipients.map((user) => {
            return (
              <div key={user._id} className="recipient-item">
                {user.username}
                <button
                  onClick={() => deleteRecipient(user._id)}
                  className="delete-recipient"
                >
                  <IoClose />
                </button>
              </div>
            );
          })}
      </div>
      <ButtonStyles disabled={isLoading} onClick={handleCreateConversation}>
        CreateConversation
      </ButtonStyles>
    </NewConversationInfoStyles>
  );
}
