import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApprovalStep {
  id: string
  teamId: string
  userId: string
  lowerBound: number,
  upperBound: number,
}

interface ApprovalStepsState {
  approvalStepsById: Record<string, ApprovalStep>
}

const initialState: ApprovalStepsState = {
  approvalStepsById: {}
}

const approvalSteps = createSlice({
  name: 'approvalSteps',
  initialState,
  reducers: {
    createApprovalStep: (state, action: PayloadAction<ApprovalStep>) => {
      const rule = action.payload
      state.approvalStepsById[rule.id] = rule
    },
    deleteApprovalStep: (state, action: PayloadAction<string>) => {
      delete state.approvalStepsById[action.payload]
    }
  }
})

export const { createApprovalStep, deleteApprovalStep } = approvalSteps.actions

export default approvalSteps.reducer
