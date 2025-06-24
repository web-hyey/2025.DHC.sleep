import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#383948',
  },

  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  backgroundCircle1: { 
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    backgroundColor: '#646680', //밝은 원
    bottom: -height * 0.48,
    left: -width * 0.25,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    backgroundColor: '#4a4c5e', //어두운 원
    bottom: -height * 0.40,
    left: -width * 0.25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#B9BBBE',
    textAlign: 'center',
    marginBottom: 40,
  },
});


export const homeStyles = StyleSheet.create({
  ...commonStyles, 
  
  container: { 
    ...commonStyles.container,
    flex : 1,
    justifyContent: 'center',
    paddingBottom : 10,
  },

  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 30,
  },

  dateButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '600' 
  },

  timeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },

  pickerBox: { 
    width: '48%', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center' 
  },

  pickerLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    marginBottom: 15 
  },

  timeDisplayButton: { 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    paddingVertical: 10, 
    paddingHorizontal: 25, 
    borderRadius: 15 
  },

  timeDisplayText: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },

  saveButton: { 
    marginTop: 40, 
    marginBottom:20,
    width: '95%', 
    backgroundColor: '#8e97fd', 
    paddingVertical: 16, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5 
  },

  saveButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});


export const infoStyles = StyleSheet.create({
  ...commonStyles,
  
  container: {
    ...commonStyles.container,
    flexGrow: 1, 
    paddingVertical: 40,
    paddingBottom : 100,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 5,
  },
  dateNavContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '85%', 
    marginBottom: 20 
  },
  arrowButton: { 
    padding: 10 
  },
  arrowText: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  dateRange: { 
    fontSize: 16, 
    color: '#B9BBBE', 
    fontWeight: '600' 
  },
  chartContainer: { 
    width: '100%', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 20, 
    paddingVertical: 30, 
    paddingHorizontal: 10 
  },
  summaryContainer: { 
    marginTop: 25, 
    width: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center' 
  },
  summaryTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    marginBottom: 10 
  },
  summaryText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#8e97fd', 
    marginBottom: 5 
  },
  summarySubtitle: { 
    fontSize: 14, 
    color: '#B9BBBE' 
  },


  scoreDetailContainer: { 
    marginTop: 15, 
    width: '100%', 
    backgroundColor: 'rgba(126, 106, 200, 0.15)', 
    borderColor: 'rgba(126, 106, 200, 0.5)', 
    borderWidth: 1, 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center'
  },


  timeDetailContainer: {
    marginTop: 15,
    width: '100%',
    backgroundColor: 'rgba(90, 200, 250, 0.15)',
    borderColor: 'rgba(90, 200, 250, 0.5)',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20, 
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  timeLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#B9BBBE',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});


export const checkListStyles = StyleSheet.create({
  ...commonStyles,
  screen: {
    flex: 1,
    backgroundColor: '#383948',
  },
  safeArea: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#383948',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 30,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#C3C0D1',
    marginTop: 8,
    marginBottom: 30,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginRight: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#5E5A72',
  },
  submitButton: {
    backgroundColor: '#8e97fd',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export const checkListResultStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#383948' 
  },
  scrollContent: { 
    paddingTop: 80, 
    paddingBottom: 120,
    paddingHorizontal: 20, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#C3C0D1', 
    marginBottom: 10 
  },
  scoreContainer: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    marginBottom: 15 
  },
  scoreNumber: { 
    fontSize: 72, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    lineHeight: 80 
  },
  scoreUnit: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginLeft: 5, 
    marginBottom: 10 
  },
  message: { 
    fontSize: 16, 
    color: '#C3C0D1', 
    textAlign: 'center', 
    marginBottom: 50 
  },
  missionItem: { 
    width: '100%', 
    backgroundColor: '#4A4562', 
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#5E5A72' 
  },
  missionItemCompleted: { 
    backgroundColor: '#3D3A50', 
    opacity: 0.7 
  },
  missionText: { 
    flex: 1, 
    marginLeft: 15, 
    fontSize: 16, 
    color: '#FFFFFF', 
    lineHeight: 22 
  },
  missionTextCompleted: { 
    textDecorationLine: 'line-through', 
    color: '#888' 
  },
  missionPointsContainer: { 
    backgroundColor: '#6C63AC', 
    borderRadius: 15, 
    paddingVertical: 6, 
    paddingHorizontal: 12 
  },
  missionPointsText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#34C759',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonDisabled: {
    backgroundColor: '#555',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export const articleStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    paddingBottom : 200,
  },
  
  scrollContent: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 200, 
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B9BBBE',
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardTextContainer: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#C3C0D1',
    marginTop: 8,
  },
  
  // 아티클 상세 페이지 스타일
  detailImage: {
     width: '100%', height: 250 
  },


  detailContentContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 200, 
  },


  detailTitle: {
     fontSize: 26, 
     fontWeight: 'bold', 
     color: '#FFFFFF', 
     marginBottom: 20 
  },


  detailSectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginTop: 30, 
    marginBottom: 10, 
    borderLeftWidth: 5, 
    borderLeftColor: '#8e97fd', 
    paddingLeft: 10 
  },


  detailSubSection: { 
    marginTop: 15, 
    marginLeft: 10 
  },


  detailSubTitle: {
    fontSize: 18, 
    fontWeight: '600', 
    color: '#E0E0E0', 
    marginBottom: 10 
  },


  detailContent: { 
    fontSize: 16,
    color: '#D0D0D0', 
    lineHeight: 26 
  },


  detailListItem: {
    fontSize: 16, color: '#D0D0D0', 
    lineHeight: 26, 
    marginLeft: 5, 
    marginBottom: 5 
  },
});


