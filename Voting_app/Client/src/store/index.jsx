import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState, getGlobalState}= createGlobalState({
    modal: "scale-0",
    connectedAccount: '',
    candidateImage: [],
    pushCandidate: {},
    contract: null,
    singleCandidateData: [],
    cand: null,
    candidateName: [],
 
})
const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }
  const daysRemaining = (days) => {
    const todaysdate = moment()
    days = Number((days + '000').slice(0))
    days = moment(days).format('YYYY-MM-DD')
    days = moment(days)
    days = days.diff(todaysdate, 'days')
    return days == 1 ? '1 day' : days + ' days'
  }

export {setGlobalState, useGlobalState, getGlobalState, truncate, daysRemaining}