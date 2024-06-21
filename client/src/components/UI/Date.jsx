const DateOfPost = ({postDate}) =>{
    const TimeOfPost = (x) => {
        let postdate = new Date(x);
        let currdate = new Date();

        if (currdate.getFullYear() - postdate.getFullYear() === 0) {
            if (currdate.getMonth() - postdate.getMonth() === 0) {
                let x = currdate.getDate() - postdate.getDate();
                if (x === 0)
                    return "Today";
                else
                    return x + " Day's ago";
            }
            else {
                let x = currdate.getMonth() - postdate.getMonth();
                return x + " Month ago"
            }
        }
        else {
            let x = currdate.getFullYear() - postdate.getFullYear();
            return x + "year's ago"
        }

    }

    return(<>
        <h3 className="justify-end text-gray-700 text-xl">{TimeOfPost(postDate)}</h3>
    </>)
}
export default DateOfPost;