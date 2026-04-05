const url_base = 'http://localhost:3000';

const api = {
    async buscarPensamentos(){
        try{
            const response = await axios.get(`${url_base}/pensamentos`);
            return await response.data;
        }catch {
            alert('Erro ao buscar pensamentos');
            throw error;
        }
    },
    async salvarPensamento(pensamento){
        try{
            const response = await axios.post(`${url_base}/pensamentos`, pensamento);
            return await response.data;
        } catch {
            alert('Erro ao salvar pensamento');
            throw error;
        }
    },
    async buscarPensamentoPorId(id){
        try{
            const response = await axios.get(  `${url_base}/pensamentos/${id}`);
            return await response.data;
        }catch {
            alert('Erro ao buscar pensamento');
            throw error;
        }
    },
    async editarPensamento(pensamento){
        try{
            const response = await axios.put(`${url_base}/pensamentos/${pensamento.id}`, pensamento);
            return await response.data;
        } catch {
            alert('Erro ao editar pensamento');
            throw error;
        }
    },
    async excluirPensamento(id){
        try{
            const response = await axios.delete(`${url_base}/pensamentos/${id}`);
        } catch {
            alert('Erro ao excluir pensamento');
            throw error;
        }
    },
    async buscarPensamentosPorTermo(termo){
        try{
            const pensamentos = await this.buscarPensamentos();
            const termdEmMinusculas = termo.toLowerCase();
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termdEmMinusculas)) ||
                    pensamento.autoria.toLowerCase().includes(termdEmMinusculas)
            })
            return pensamentosFiltrados
        }catch (error){
            alert("Erro ao filtrar pensamentos")
            throw error;
        }
    }
}

export default api;