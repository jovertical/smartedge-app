interface Model {
  id: number
  created_at: String
  updated_at: String
  deleted_at?: String
}

interface User extends Model {
  type: 'reviewee' | 'admin'
  name: String
  email: String
  reviewee_profile: RevieweeProfile
}

interface RevieweeProfile extends Model {
  user_id: Number
  reviewee_number: String
  enrolled_for: String
  expired_at?: String
}

interface Subject extends Model {
  name: String
  body?: String
  questions?: Question[]
}

interface Question extends Model {
  subject_id: Number
  body: String
  answers?: Answer[]
}

interface Answer extends Model {
  question_id: Number
  body: String
  correct: Boolean
}
