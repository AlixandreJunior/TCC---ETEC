def physic_generate_recommendation(checkin):
    recs = []

    if checkin.energy_level <= 3:
        recs.append("Você relatou estar com pouca energia. Tente dormir um pouco mais cedo hoje ou fazer uma pausa para relaxar.")
    if checkin.sleep_quality == 'Ruim':
        recs.append("Seu sono foi ruim. Evite cafeína após as 16h e tente uma meditação guiada antes de dormir.")
    if checkin.healthy_eating == 'Ruim':
        recs.append("Considere fazer uma refeição balanceada hoje com vegetais, proteínas e bastante água.")
    if checkin.is_pain:
        recs.append("Você relatou dor. Evite atividades físicas intensas hoje e, se persistir, procure orientação médica.")
    if checkin.activity_level < 3:
        recs.append("Que tal uma caminhada leve? Apenas 15 minutos podem fazer bem pro corpo e mente.")
    if not recs:
        recs.append("Ótimo trabalho cuidando da sua saúde hoje! Continue assim!")

    return recs if recs else ["Você está indo bem! Continue se cuidando."]

def mental_generate_recommendation(checkin):
    recs = []

    if checkin.stress_level >= 7:
        recs.append("Tente fazer uma pausa e praticar uma respiração consciente.")
    if checkin.anxiety_level >= 7:
        recs.append("Uma caminhada leve ou meditação guiada pode ajudar.")
    if checkin.is_feeling_lonely:
        recs.append("Entre em contato com alguém que você confia.")
    if checkin.is_low_self_esteem:
        recs.append("Escreva algo que você gosta em si mesmo.")
    if checkin.is_overwhelmed:
        recs.append("Organize suas tarefas e tente focar em uma coisa por vez.")

    return recs if recs else ["Você está indo bem! Continue se cuidando."]
