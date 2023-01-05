export const getChatBuddyEmail = (users: string[], loggedInUser: string) => {
  return users.find(user => user !== loggedInUser) || '';
}