import { ADD_PDF } from '../actions/pdf'
import { store } from '../store/pdf'

const addPdf = (state, item) => ([ ...state, item ]);

function pdf(state = store, action) {
    switch (action.type) {
        case ADD_PDF:
            return addPdf(state, action.item)
        default:
            return state
    }
}

export default pdf
