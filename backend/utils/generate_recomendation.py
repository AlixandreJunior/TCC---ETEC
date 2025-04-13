def physic_generate_recommendation(checkin):
    recs = []

    if checkin.energy_level <= 3:
        recs.append("Você relatou estar com pouca energia. Tente dormir um pouco mais cedo hoje ou fazer uma pausa para relaxar.")

    if checkin.sleep_quality == 'Ruim':
        recs.append("Seu sono foi ruim. Evite cafeína após as 18h e tente uma meditação guiada antes de dormir.")

    if checkin.healthy_eating == 'Ruim':
        recs.append("Considere fazer uma refeição balanceada hoje com vegetais, proteínas e bastante água.")

    if checkin.is_pain:
        recs.append("Você relatou dor. Evite atividades físicas intensas hoje e, se persistir, procure orientação médica.")

    if checkin.is_smoked:
        recs.append("Evite fumar hoje e tente reduzir aos poucos. Seu corpo agradece!")

    if checkin.activity_level < 3:
        recs.append("Que tal uma caminhada leve? Apenas 15 minutos podem fazer bem pro corpo e mente.")

    if not recs:
        recs.append("Ótimo trabalho cuidando da sua saúde hoje! Continue assim!")

    return " ".join(recs)

def mental_generate_recommendation(checkin):
    if checkin.score < 30:
        return "Você parece sobrecarregado. Tente uma meditação guiada de 5 minutos ou um exercício de respiração."
    elif checkin.stress_level > 7:
        return "Seu nível de estresse está elevado. Que tal uma caminhada leve ou um momento de silêncio?"
    elif checkin.anxiety_level > 7:
        return "Parece que você está ansioso. Experimente uma técnica de respiração 4-7-8."
    elif checkin.mood in ['Triste', 'Estressado']:
        return "Um diário emocional ou prática de gratidão pode ajudar a aliviar esse sentimento."
    else:
        return "Você está indo bem! Continue praticando o autocuidado com meditações curtas e pausas conscientes."
