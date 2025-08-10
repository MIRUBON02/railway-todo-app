export const LimitInput = ({limit, setLimit, disabled}) => {
    return(
        <div className="limit_input">
          <label>
            期限：
              <input
                type="datetime-local"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                disabled={disabled}/>
          </label>
        </div>
    );
};