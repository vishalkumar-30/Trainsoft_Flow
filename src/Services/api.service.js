/* Note : Calling Api Standard
* E.g : getListing Axios call accept params in following seq
* Url : service url
  payload : post data
  param : url parameter
  config : if config object
  config = {
    loader : '#container'  //loader will show for the div having id = 'container'
  }
  if any api fails or empty response comes then related messge will be shown

  Ex:
  getListing(payload,config) {
    var params ={
      viewType :'detail'
    };
    return AxiosService.post('/api/listing', payload,params,config);
  },

*
*/
import { Global } from "recharts";
import GLOBELCONSTANT from "../Constant/GlobleConstant.js";
import AxiosService from "./axios.service.js";
const zoomAuth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InRHY3VUTmpkUVVTM2prVHdfZWF6OWciLCJleHAiOjE2MTY1NzM4OTMsImlhdCI6MTYxNTk2OTA3OX0.2Aqdh7qmOJvNUx3JijVb5XqMwdiZS0ggvNbJTPljtgA"

const RestService = {
  getCount: (name) => AxiosService.get(GLOBELCONSTANT.GET_COUNT.replace("{classz}", name)),
  login: (payload) => AxiosService.post(GLOBELCONSTANT.AUTH.LOGIN, {}, {}, payload),
  forgetPwd: (email) => AxiosService.post(GLOBELCONSTANT.AUTH.FORGOT + email),
  validateToken: (token) => AxiosService.post(GLOBELCONSTANT.AUTH.RESET.replace("{token}", token)),
  updatePwd: (token, sid, pwd) => AxiosService.put(GLOBELCONSTANT.AUTH.UPDATE_PWD.replace("{token}", token).replace("{appUserSid}", sid).replace("{password}", pwd,)),

  //  course
  getAllCourse: () => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE),
  CreateCourse: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE, payload),
  CreateSession: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_SESSION, payload),
  updateSession: (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE_SESSION, payload),
  getCourseSession: (sid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE_SESSION + sid),
  getAllSectionsAndCourseContents: (courseSid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE_SECTION + `${courseSid}/get-sections-course-content`),
  deleteCourse: (courseSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE + courseSid),
  editCourse: (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE, payload),
  searchCourse: (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_COURSE + name),
  searchSession: (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_SESSION + name),
  deleteSession: (sessionId) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_SESSION + sessionId),
  deleteCourseContentFile: (contentSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_CONTENT_FILE + `${contentSid}`),
  getCourseSessionByPage: (courseSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_SESSION_PAGE.replace("{courseSid}", courseSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getCourseByPage: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_BY_PAGE.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  createCourseSection: (payload, courseSid) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE_SECTION + `${courseSid}/create-section`, payload),
  uploadCourseContent: (payload, courseSectionSid) => AxiosService.uploadMultiPart(GLOBELCONSTANT.COURSE.CREATE_COURSE_CONTENT + `${courseSectionSid}/upload-content`, payload),
  bulkCreateCourseSectionAndContents: (payload, courseSid) => AxiosService.uploadMultiPart(GLOBELCONSTANT.COURSE.BULK_CREATE_COURSE_SECTION_AND_CONTENT + `?course-sid=${courseSid}`, payload),
  markCourseAsCompleted: (contentSid, sectionSid, trainingsid, payload) => AxiosService.put(GLOBELCONSTANT.COURSE.MARK_COURSE_COMPLETED + `course-content-sid=${contentSid}&section-sid=${sectionSid}&training-sid=${trainingsid}`, payload),
  markCourseAsCompletedCode: (contentSid, sectionSid, trainingsid, payload) => AxiosService.put(GLOBELCONSTANT.COURSE.MARK_COURSE_COMPLETED + `coding-question-id=${contentSid}&section-sid=${sectionSid}&training-sid=${trainingsid}`, payload),
  markCourseAsCompletedLabs: (contentSid, sectionSid, trainingsid, payload) => AxiosService.put(GLOBELCONSTANT.COURSE.MARK_COURSE_COMPLETED + `lab-id=${contentSid}&section-sid=${sectionSid}&training-sid=${trainingsid}`, payload),
  getCompletedCourses: (trainingsid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COMPLETED_COURSES + `training-sid=${trainingsid}`),
  cloneCourseAndContents: (coursesid) => AxiosService.patch(GLOBELCONSTANT.COURSE.CLONE_COURSE_AND_CONTENTS + `?course-sid=${coursesid}`),
  updateCourseContent: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.UPDATE_COURSE_CONTENT, payload),
  deleteCourseContent: (contentSid, sectionSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_CONTENT + `?course-content-sid=${contentSid}&course-section-sid=${sectionSid}`),
  deleteCourseSection: (sectionSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_SECTION + `?section-sid=${sectionSid}`),


  //batches
  getAllBatches: () => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST),
  getAllBatchesByPage: (pageNo, pageSize) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST + pageNo + "/" + pageSize),
  getBatchesBySid: (sid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_SID.replace("{batchSid}", sid)),
  deleteBatches: (batchId) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCHES + batchId),
  deleteBatchesParticipant: (batchId, vASid) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCH_PARTICIPANT.replace("{batchSid}", batchId).replace("{vASid}", vASid)),
  editBatches: (payload) => AxiosService.put(GLOBELCONSTANT.BATCHES.EDIT_BATCHES, payload),
  searchBatches: (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.SEARCH_BATCHES + name),
  getBatchParticipant: (batchSid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_PARTICIPANT.replace("{batchSid}", batchSid)),
  validateBatches: (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.BATCH_VALIDATION.replace("{batchName}", name)),
  associateParticipant: (batchSid, participant) => AxiosService.post(GLOBELCONSTANT.BATCHES.ASSOCIATE_PARTICIPANT.replace("{batchSid}", batchSid), participant),
  getBatchLearner: (sid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_LEARNER.replace("{batchSid}", sid)),


  CreateBatch: (payload) => AxiosService.post(GLOBELCONSTANT.BATCHES.CREATE_BATCHES, payload),
  //participant
  getAllParticipant: (sid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT),
  getAllUser: (type) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS + type),
  getUserDetails: (vSId) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT_ID.replace("{VASid}", vSId)),

  getAllUserByPage: (type, pageNo, pageSize) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS + `${type}/${pageNo}/${pageSize}`),
  searchUser: (str) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.SEARCH_USER.replace("{str}", str)),
  UploadParticipant: (payload, header) => AxiosService.uploadMultiPart(GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT, payload, header),
  createParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.CREATE_PARTICIPANT, payload),
  updateParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.UPDATE_PARTICIPANT, payload),
  generatePwd: () => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.GENERATE_PWD),
  getUserCount: (type) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_USER_COUNT.replace("{type}", type)),
  validateEmail: (email) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.EMAIL_VALIDATION.replace("{email}", email)),
  changeUserRole: (role, vSid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.UPDATE_ROLE.replace("{role}", role).replace("{virtualAccountSid}", vSid)),
  changeAndDeleteStatus: (status, vSid) => AxiosService.put(GLOBELCONSTANT.PARTICIPANT.STATUS_DELETE.replace("{status}", status).replace("{vASid}", vSid)),
  changeDepartmentRole: (role, departmentVASid) => AxiosService.put(GLOBELCONSTANT.PARTICIPANT.UPDATE_DEPARTMENT_ROLE.replace("{role}", role).replace("{departmentVASid}", departmentVASid)),

  // training
  getAllTrainingByPage: (type, pageNo, pageSize) => AxiosService
    .get(type === "SUPERVISOR" ? GLOBELCONSTANT.TRAINING.GET_TRAINING + "/" + pageNo + "/" + pageSize :
      (type === "INSTRUCTOR" ? GLOBELCONSTANT.TRAINING.GET_INSTRUCTOR_TRAINING.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)
        : GLOBELCONSTANT.TRAINING.GET_LEARNER_TRAINING)),

  getTrainings: () => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING),
  getTrainingSession: (trainingSid, courseSid) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SESSION.replace("{trainingSid}", trainingSid).replace("{courseSid}", courseSid)),
  createTraining: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_TRAINING, payload),
  editTraining: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.EDIT_TRAINING, payload),
  editTrainingSession: (payload, meetingSid = "") => AxiosService.post(GLOBELCONSTANT.TRAINING.UPDATE_TRAINING_SESSION + "/" + meetingSid, payload),
  CreateTrainingSession: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_SESSION, payload),
  searchTraining: (name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINER + name),
  deleteTraining: (trainingId) => AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAINER + trainingId),
  getTrainingBySid: (trainingSid) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SID.replace("{trainingSid}", trainingSid)),
  deleteTrainingSession: (trainingId) => AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAIN_SESSION.replace("{trainingSesssionSid}", trainingId)),
  searchTrainingSession: (trainingSid, name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINING_SESSION.replace("{trainingSid}", trainingSid).replace("{name}", name)),
  unScheduleSession: (sessionSid, status, meetingSid) => AxiosService.post(GLOBELCONSTANT.TRAINING.UNSCHEDULE_SESSION.replace("{sessionSid}", sessionSid).replace("{status}", status).replace("{meetingId}", meetingSid)),
  zoomParticipant: () => AxiosService.get('https://api.zoom.us/v2/users/kumarkanhiya21@gmail.com/meetings?page_size=30&type=live', zoomAuth),
  getTrainingContentsByTrainingSid: (trainingSid) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_CONTENT_BY_SID + `=${trainingSid}`),
  saveUserNotes: (trainingSessionSid, trainingSid, payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.SAVES_NOTES + `?training-session-sid=${trainingSessionSid}&training-sid=${trainingSid}`, payload),
  getUserNotes: () => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_NOTES),
  getTrainingByStatus: (pageNo, pageSize, status) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_BY_STATUS + `/${pageNo}/${pageSize}?status=${status}`),
  extractTextFromImages: (contentSid, contentType, trainingSid, payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.EXTRACT_TEXT_FROM_IMAGES + `?content-sid=${contentSid}&content-type=${contentType}&training-sid=${trainingSid}`, payload),
  // getTrainingByRole: (pageNo,pageSize) => AxiosService.get(GLOBELCONSTANT.TRAINING.PARTICIPANT_BY_ROLE.replace("{pageNo}",pageNo).replace("{pageSize}",pageSize)),

  // assessment
  getAllTopic: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_TOPIC + pageSize + "&pageNo=" + pageNo),
  deleteTopic: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_TOPIC.replace("{topicSid}", sid)),
  updateTopic: (payload) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.UPDATE_TOPIC, payload),
  getAllQuestion: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ALL_QUESTION + pageSize + "&pageNo=" + pageNo),
  createQuestion: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_QUESTION, payload),
  GetQuestionType: () => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_QUESTION_TYPE),
  createTopic: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_TOPIC, payload),
  getAssessmentByTopic: (assID, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT.replace("{assId}", assID).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  deleteAssessment: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_ASSESSMENT.replace("{assId}", sid)),
  deleteAssociateQuestion: (qId, aId) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_ASS_QUESTION.replace("{qsid}", qId).replace("{asid}", aId)),
  deleteQuestion: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_QUESTION.replace("{questionId}", sid)),
  associateQuestion: (assID, payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.ASSOCIATE_QUESTION.replace("{assID}", assID), payload),
  getNotAssociateQuestion: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_NOT_ASS_QUESTION.replace("{assId}", assId)),
  getAssociateQuestion: (assID, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSOCIATE_QUESTION.replace("{assId}", assID).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  getAllCategory: () => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_CATEGORY),
  createAssessment: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_ASSESSMENT, payload),
  updateAssessment: (payload) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.UPDATE_ASSESSMENT, payload),
  searchTopic: (query, companySid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_TOPIC + query + "/" + companySid),
  searchAssessment: (query, companySid, topicSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_ASSESSMENT.replace("{query}", query).replace("{companySid}", companySid).replace("{topicSid}", topicSid)),
  searchQuestion: (query, companySid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_QUESTION.replace("{query}", query).replace("{companySid}", companySid).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  generateUrl: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GENERATE_URL.replace("{assId}", assId)),
  uploadAssParticipant: (payload, headers) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.UPLOAD_ASSESSMENT, payload, '', headers),
  uploadQuestion: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.UPLOAD_QUESTION, payload),
  getAssessmentDashboard: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_DASHBOARD.replace("{aasId}", assId)),
  getAssUser: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_DASHBOARD.replace("{aasId}", assId)),
  getAssestUser: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_USER.replace("{assID}", assId)),
  getQuestionById: (qId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_QUESTION_BY_SID.replace("{qId}", qId)),
  changeQuestionStatus: (qId, status) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.CHANGE_QUESTION_STATUS.replace("{qId}", qId).replace("{status}", status)),
  getAllTopics: () => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ALL_TOPICS),
  getAllAssessmentsInATopic: (topicSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ALL_ASSESSMENTS_IN_A_TOPIC + `?topic_sid=${topicSid}`),
  addAssessmentToCourse: (assessmentSid, courseSid, sectionSid, tags) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.ADD_ASSESSMENT_TO_COURSE + `?assessment_sid=${assessmentSid}&course_sid=${courseSid}&section_sid=${sectionSid}&tags=${tags}`),


  // assessment dashboard
  getTopUser: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TOP_USER.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  getDashboardData: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.DASHBOARD_DATA.replace("{sid}", vSid)),
  getAvgCategory: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ALL_CATEGORY_SCORE.replace("{sid}", vSid)),
  getAssessmentByCategory: (cSid, caSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_BY_CATEGORY.replace("{cSid}", cSid).replace("{caSid}", caSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getTagCount: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TAGS_COUNT.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  searchCategoryAssessment: (value, cSid, caSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.SEARCH_CATEGORY_ASSESSMENT.replace("{value}", value).replace("{cSid}", cSid).replace("{caSid}", caSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getCategoryAssessmentCount: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_COUNT.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  getAllTimeLeaderboard: (cSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.ALL_TIME_LEADERBOARD.replace('{cSid}', cSid)),
  getTodayLeaderbord: (cSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TODAY_LEADERBOADE.replace('{cSid}', cSid)),
  getMyAssessment: (status, sid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_MY_ASSESSMENT.replace('{status}', status).replace("{sid}", sid)),
  createBookmark: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.CREATE_BOOKMARK, payload),
  getBookmark: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_BOOKMARK.replace("{vSid}", vSid)),
  removeBookmark: (payload) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.REMOVE_BOOKMARK, payload),
  filterAssessment: (pageNo, pageSize, payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_FILTER.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize), payload),
  filterCount: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.FILTER_COUNT, payload),
  getMyAssessmentCount: (sid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_MYASSESSMENT_COUNT.replace('{sid}', sid)),
  getEAssessCount: (name) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_COUNT.replace("{classz}", name)),


  // assessment 
  getAssessmentInstruction: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.GET_INSTRUCTION, payload),
  getQuestionAnswer: (assessmentSid, virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_QUESTIONS.replace("{assessmentSid}", assessmentSid).replace("{virtualAccountSid}", virtualAccountSid)),
  submitAnswer: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_ANSWER, payload),
  reviewAssessmentResponse: (virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.REVIEW_RESPONSE.replace("{virtualAccountSid}", virtualAccountSid)),
  submitAssessment: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_ASSESSMENT, payload),
  getAssessmentScore: (assessmentSid, virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_SCORE.replace("{assessmentSid}", assessmentSid).replace("{virtualAccountSid}", virtualAccountSid)),
  getSubmittedResponse: (virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_RESPONSE.replace("{virtualAccountSid}", virtualAccountSid)),
  getTopics: () => AxiosService.get(GLOBELCONSTANT.API.GET_TOPIC),
  createAssessmentUser: (payload, header) => AxiosService.post(GLOBELCONSTANT.API.CREATE_ASS_USER, payload, "", header),
  getAssessmentBySid: (assSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_ASSESSMENT_BY_SID + assSid),
  getTodayLeaders: (sid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.TODAY_LEADER + sid),
  getAllTimeLeaders: (sid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.ALL_TIME_LEADER + sid),
  updateQuestion: (payload) => AxiosService.put(GLOBELCONSTANT.API.ASSESSMENT.UPDATE_QUESTION, payload),
  getAssUserByVirtualAccountSid: (sid) => AxiosService.get(GLOBELCONSTANT.API.GET_ASSES_USER + sid),
  quitAssessment: (questionSid, virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.QUIT_ASSESSMENT + questionSid + "/" + virtualAccountSid),

  //feedback
  storeFeedback: (trainingsid, payload) => AxiosService.post(GLOBELCONSTANT.FEEDBACK.SUBMIT_FEEDBAK + `training-sid=${trainingsid}`, payload),
  retrieveUserCertificationDetails: () => AxiosService.get(GLOBELCONSTANT.FEEDBACK.RETRIEVE_USER_CERTIFICATE_DETAILS),

  //notification

  getNotification: () => AxiosService.get(GLOBELCONSTANT.NOTIFICATION.GET_NOTIFICATION),
  deleteAllNotifications: () => AxiosService.delete(GLOBELCONSTANT.NOTIFICATION.DELETE_ALL_NOTIFICATIONS),

  //labs
  getAllLabCategories: () => AxiosService.get(GLOBELCONSTANT.LABS.GET_ALL_LAB_CATEGORIES),
  filterLabs: (labs) => AxiosService.get(GLOBELCONSTANT.LABS.FILTER_LABS + `?filter=${labs}`),
  filterAccountLabs: (labs) => AxiosService.get(GLOBELCONSTANT.LABS.FILTER_ACCOUNT_LABS + `?filter=${labs}`),
  getAllLabs: () => AxiosService.get(GLOBELCONSTANT.LABS.GET_ALL_LABS),
  getAccountLabs: () => AxiosService.get(GLOBELCONSTANT.LABS.GET_LABS_IN_ACCOUNT),
  selectLabInCourse: (labId, courseSid, sectionSid, tags) => AxiosService.post(GLOBELCONSTANT.LABS.ADD_LAB_IN_COURSE + `${labId}/add-lab-in-course?course-sid=${courseSid}&section-sid=${sectionSid}&tags=${tags}`),
  addLabsToAccount: (labId) => AxiosService.post(GLOBELCONSTANT.LABS.ADD_LAB_TO_ACCOUNT + `${labId}/add-lab-to-account`),
  ec2GuacamolePOC: (labId, sectionSid, trainingSid) => AxiosService.post(GLOBELCONSTANT.LABS.EC2_GUACAMOLEPOC + `${labId}/start-lab?section-sid=${sectionSid}&training_sid=${trainingSid}`),
  stopEC2InstanceAndTerminateGuacamoleServer: (conString) => AxiosService.delete(GLOBELCONSTANT.LABS.STOP_EC2_INSTANCE_AND_TERMINATE_GUACAMOLE_SERVER + `?connection-string=${conString}`),
  terminateEC2InstanceAndTerminateGuacamoleServer: (conString) => AxiosService.delete(GLOBELCONSTANT.LABS.TERMINATE_EC2_INSTANCE_AND_TERMINATE_GUACAMOLE_SERVER + `?connection-string=${conString}`),

  // SUPRVISERDASHBOARD
  getAverageTrainerFeedback: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.GET_AVERAGE_TRAINER_FEEDBACK),
  getAverageTrainingFeedback: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.GET_AVERAGE_TRAINING_FEEDBACK),
  weeklyUsersLoginHistory: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.WEEKLY_USERS_LOGIN_HISTORY),
  getTrainingsAverageScore: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.GET_TRAININGS_AVERAGE_SCORE),
  filterTrainingsBasedOnDateRange: (fromDate, toDate) => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.FILTER_TRAININGS_BASED_ON_DATE_RANGE + `?from=${fromDate}&to=${toDate}`),
  getOngoingTrainingProgress: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.GET_ONGOING_TRAINING_PROGRESS),

  getAllTrainingSessions: () => AxiosService.get(GLOBELCONSTANT.SUPERVISOR_DASHBOARD.GET_ALL_TRAINING_SESSIONS),


  // LEARNERDASHBOARD
  getLearnersAssessmentScore: () => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_LEARNERS_ASSESSMENT_SCORE),
  getLearnerAllTrainingsProgress: () => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_LEARNER_ALL_TRAININGS_PROGRESS),
  getLearnerTrainingSessions: () => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_LEARNER_TRAINING_SESSIONS),
  getallLearnerTrainingSessions: () => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_ALL_TRAINING_SESSIONS),
  getLearnerDasboardCardsDetails: () => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_LEARNER_DASHBOARD_CARD_DETAILS),
  getLogoutTimes: (timeSpent) => AxiosService.get(GLOBELCONSTANT.LEARNER_DASHBOARD.GET_LOGOUT_TIMES + `?time_spent=${timeSpent}`),

  //INSTRUCTORDASHBOARD(
  getTrainersTrainingSessions: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR_DASHBOARD.GET_TRAINERS_TRAINING_SESSIONS),
  getInstructorFeedbackDetails: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR_DASHBOARD.GET_INSTRUCTOR_FEEDBACK_DETAILS),
  getTrainersWeeklySessions: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR_DASHBOARD.GET_TRAINERS_WEEKLY_SESSIONs),
  getTrainerTrainingSessions: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR_DASHBOARD.GET_ALL_TRAINING_SESSIONS),

  //Report
  generateReport: (assessmentSid, instructor, labId, passPercentage, reportName, trainingSid) => AxiosService.patch(GLOBELCONSTANT.REPORT.GENERATE_REPORT + `?assessment=${assessmentSid}&instructor=${instructor}&lab=${labId}&pass-percentage=${passPercentage}&report-type=${reportName}&training=${trainingSid}`),

  //get instructor
  getInstructor: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR.GET_INSTRUCTOR),
  getDepartments: () => AxiosService.get(GLOBELCONSTANT.INSTRUCTOR_DASHBOARD.GET_DEPARTMENTS),

  //support
  submitSupportTicket: (payload) => AxiosService.post(GLOBELCONSTANT.SUPPORT.SUBMIT_TICKET, payload),
  getTicketsByRole: (status) => AxiosService.get(GLOBELCONSTANT.SUPPORT.GET_TICKETS_BY_ROLE + `?status=${status}`),
  takeTicketOwnership: (ticketSid) => AxiosService.put(GLOBELCONSTANT.SUPPORT.OWN_TICKET + `?ticket-sid=${ticketSid}`),
  getTicketHistory: (ticketSid) => AxiosService.get(GLOBELCONSTANT.SUPPORT.GET_TICKET_HISTORY + `?ticket-sid=${ticketSid}`),
  getUserTicketsByStatus: (status) => AxiosService.get(GLOBELCONSTANT.SUPPORT.GET_USER_TICKETS + `?status=${status}`),
  startConversation: (ticketSid, payload) => AxiosService.post(GLOBELCONSTANT.SUPPORT.START_CONVERSION + `?ticket-sid=${ticketSid}`, payload),
  closeTicket: (commendSid, payload) => AxiosService.put(GLOBELCONSTANT.SUPPORT.RESOLVE_TICKET + `?comment-sid=${commendSid}`, payload),
  reopenSupportTicket: (ticketSid) => AxiosService.put(GLOBELCONSTANT.SUPPORT.REOPEN_TICKETS + `?ticket-sid=${ticketSid}`),

  //coding questions
  getAllCodingQuestions: () => AxiosService.get(GLOBELCONSTANT.CODING.GET_ALL_CODING_QUESTIONS),
  addCodingQuestionToSection: (courseSid, sectionSid, questionId, tags) => AxiosService.post(GLOBELCONSTANT.CODING.ADD_CODING_QUESTIONS_TO_SECTION + `?course_sid=${courseSid}&question_id=${questionId}&section_sid=${sectionSid}&tags=${tags}`),

  //USERPROFILE
  getprofiledetails: () => AxiosService.get(GLOBELCONSTANT.USERPROFILE.GET_PROFILE_DETAILS),
  uploadProfilePic: (payload) => AxiosService.post(GLOBELCONSTANT.USERPROFILE.UPLOAD_PROFILE_PIC, payload),

  //weighted score
  getLearnerWeightedScores: (trainingSid) => AxiosService.get(GLOBELCONSTANT.WEIGHTEDSCORES.GET_LEARNER_WEIGHTED_SCORES + `?training-sid=${trainingSid}`),
  getOverallLeaderboard: () => AxiosService.get(GLOBELCONSTANT.WEIGHTEDSCORES.GET_OVERALL_LEADERBOARD),
  getUserTagScoreAnanlysis: () => AxiosService.get(GLOBELCONSTANT.WEIGHTEDSCORES.GET_USER_TAG_SCORE_ANALYSIS),
  getUserTagWiseScoring: () => AxiosService.get(GLOBELCONSTANT.WEIGHTEDSCORES.GET_USER_TAGWISE_SCORING)
};



export default RestService;
