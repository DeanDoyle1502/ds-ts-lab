import { colleagues, friends } from "./01-basics";
import { Friend, Colleague, EmailContact } from "./myTypes";


function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(friends: Friend[]) : string[] {
    return friends.map(friend => {
        friend.age += 1;
        return `${friend.name} is now ${friend.age}`
    });
}

console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
  console.log(highestExtension(colleagues.current));


function addColleague(colleagues: Colleague[],  newName : string , newDepartment : string, newEmail : string  ) : Colleague[] {

    const highest = highestExtension(colleagues).contact.extension +1;

    const newColleague : Colleague = {
        name: newName,
        department: newDepartment,
        contact: {
            email: newEmail, extension: highest
        }

    }

    colleagues.push(newColleague)

    return colleagues;
}

  addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
  console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

  function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
  ): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
       end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
  }
  // Test invocations
  console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); 

  function findFriends(
    friends: Friend[],
    find: ( friend: Friend ) => boolean ){
        return friends
        .filter(find)
        .map(friend => friend.name);
    }
    
console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friends: Friend, newInterest: string): string[]{
    if(!friends.interests) {
        friends.interests = [];
    } 

    friends.interests.push(newInterest);

    return friends.interests;
}

console.log(addInterest(friends[1], 'Football'))