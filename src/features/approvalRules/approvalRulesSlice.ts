import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApprovalRule {
  id: string
  teamId: string
  userId: string
  lowerBound: number,
  upperBound: number,
}

interface ApprovalRulesState {
  approvalRulesById: Record<string, ApprovalRule>
}

const initialState: ApprovalRulesState = {
  approvalRulesById: {}
}

const approvalRules = createSlice({
  name: 'approvalRules',
  initialState,
  reducers: {
    createApprovalRule: (state, action: PayloadAction<ApprovalRule>) => {
      const rule = action.payload
      state.approvalRulesById[rule.id] = rule
    },
    deleteApprovalRule: (state, action: PayloadAction<string>) => {
      delete state.approvalRulesById[action.payload]
    }
  }
})

export const { createApprovalRule, deleteApprovalRule } = approvalRules.actions

export default approvalRules.reducer
