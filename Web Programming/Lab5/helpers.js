//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export function idErrorCheck(id) {
    // if no argument
    if (!id || id === undefined) {
        throw `Error: no arguments`;
    }
    // if ID is not a string
    else if (typeof id !== "string") {
        throw `Error: ${id} Not a string`;
    }
    id = id.trim(); // trim string
    // if empty string
    if (id.length === 0) {
        throw `Error: empty string`;
    }
    // cannot be just a string of digits
    if (!isNaN(id))
      throw `Error: ${id} is not a valid value for id as it only contains digits`;
    return id;
}

